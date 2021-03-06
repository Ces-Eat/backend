import { Request, Response } from "express";
import { CreateRestaurantInput, GetRestaurantInput } from "../schemas/restaurant.schema";
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurant, updateRestaurant } from "../services/restaurant.service";

export async function createRestaurantHandler(req: Request<{}, {}, CreateRestaurantInput["body"]>, res: Response) {

    const userid = res.locals.user.id;
    //const userid = "user_adminadmin";
    const data = {
        ...req.body,
        userId:  userid
    };

    //Verify if restaurant exists
    const restaurant = await getRestaurant({userId: userid}, {});
    if (restaurant != null) {
        if (restaurant.deletedAt != null) {
            const updatedRestaurant = await updateRestaurant({userId: userid}, {...data, deletedAt: null}, {new: true}, true);
            return res.send(updatedRestaurant);
        }
        return res.status(400).send("Un restaurant est déjà créé pour cet utilisateur");
    }
    
    const newRestaurant = await createRestaurant(data);
    return res.send(newRestaurant);
}

export async function getRestaurantHandler(req: Request<GetRestaurantInput["params"], {}, {}>, res: Response, self: boolean = true) {

    let data;
    if (self)  {
        const userid = res.locals.user.id;
        //data = { userId: "user_adminadmin" }
        data = { userId: userid }
    }
    else {
        data = { restaurantId: req.params.restaurantid }
    }

    const restaurant = await getRestaurant({...data}, {});
    if (restaurant === null) return res.sendStatus(404);
    return res.send(restaurant);
}

export async function getAllRestaurantsHandler(req: Request, res: Response) {

    // +- 0.25
    const latitudeQuery = req.query.lat;
    const longitudeQuery = req.query.lng;

    let restaurants = await getAllRestaurants({});

    if (latitudeQuery && longitudeQuery) {
        const lat = parseFloat(latitudeQuery.toString());
        const lng = parseFloat(longitudeQuery.toString());
        const rad = 0.25;
        restaurants = restaurants.filter(restaurant => (restaurant.address.latitude <= lat + rad && restaurant.address.latitude >= lat - rad) && (restaurant.address.longitude <= lng + rad && restaurant.address.longitude >= lng - rad));
    }
    return res.send(restaurants);
}

export async function updateRestaurantHandler(req: Request, res: Response) {

    const userid = res.locals.user.id;
    //const userid = "user_adminadmin";

    const updateData = req.body;

    //Verify if restaurant exists
    const restaurant = await getRestaurant({userId: userid});
    if (restaurant === null) return res.sendStatus(404);

    const updatedRestaurant = await updateRestaurant({_id: restaurant._id}, {...updateData}, {new: true});
    return res.send(updatedRestaurant);
}

export async function deleteRestaurantHandler(req: Request, res: Response) {

    const userid = res.locals.user.id;
    //const userid = "user_adminadmin";

    //Verify if restaurant exists
    const restaurant = await getRestaurant({userId: userid});
    if (restaurant === null) return res.sendStatus(404);

    const deletion = await deleteRestaurant({_id: restaurant._id}, restaurant.userId);
    if (deletion === null) return res.sendStatus(404);
    return res.send({
        message: "Restaurant deleted successfully",
        restaurantid: deletion._id
    })
}