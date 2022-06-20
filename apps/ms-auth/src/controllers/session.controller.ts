import config from "config";
import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/session.schema";
import { createSession, deleteSession, getSessions } from "../services/session.service";
import { validateUserCredentials } from "../services/user.service";
import { signJwt } from "../utils/jwt.util";
import logger from "../utils/logger.util";


export async function createSessionHandler(
    req: Request<{}, {}, CreateSessionInput["body"]>, 
    res: Response
) {

    const sessionInput = req.body

    //Validate the user's password
    const validation = await validateUserCredentials(sessionInput);
    if(!validation.valid) return res.status(401).send("Invalid email or password");

    //Create session
    const user = validation.user
    if (user === null) return res.sendStatus(500)
    const session = await createSession(user.id, req.get("user-agent") || "")

    //Create an access token
    const accessToken = signJwt(
        {
        ...user, 
        session: session.id,
        },
        "accessTokenPrivateKey",
        {
            expiresIn: config.get<string>("jwt.accessTokenTtl")
        }
    );

    //Create a refresh token
    const refreshToken = signJwt(
        {
        ...user, 
        session: session.id,
        },
        "refreshTokenPrivateKey",
        {
            expiresIn: config.get<string>("jwt.refreshTokenTtl")
        }
    );

    //Return access and refresh token
    res.send({accessToken, refreshToken, roleId: user.roleId})
}

export async function getSessionsHandler(
    req: Request,
    res: Response
){
    const userId = res.locals.user.id
    logger.info(JSON.stringify(userId))
    const sessions = await getSessions(userId)
    logger.info(JSON.stringify(sessions))

    return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {

    const sessionId = res.locals.user.session;
    await deleteSession(sessionId);
  
    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  }