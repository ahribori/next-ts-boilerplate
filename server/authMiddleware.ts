import { IncomingMessage } from 'http';
import { ExpressResponse } from './server';

enum AccessTokenTypes {
    KAKAO = 'kakao',
    NAVER = 'naver',
    FACEBOOK = 'facebook',
    GOOGLE = 'google',
}

const authMiddleware = (req: IncomingMessage, res: ExpressResponse, next: Function) => {

    const accessToken: string | undefined = req.headers['authorization'];

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Not logged in',
        });
    }

    const accessTokenFragments = accessToken.split(' ');
    const accessTokenPrefix: string = accessTokenFragments[0];
    const accessTokenBody: string = accessTokenFragments[1];


    let isTokenValid = false;

    // TODO 카카오 토큰 검증
    switch (accessTokenPrefix.toLowerCase()) {
        case AccessTokenTypes.KAKAO: {
            console.log(accessTokenBody);
            break;
        }
        case AccessTokenTypes.NAVER: {
            break;
        }
        case AccessTokenTypes.GOOGLE: {
            break;
        }
        case AccessTokenTypes.FACEBOOK: {
            break;
        }
        default: {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Invalid authorization header',
            });
        }
    }

    if (!isTokenValid) {
        return res.status(403).json({
            success: false,
            statusCode: 403,
            message: 'Forbidden',
        });
    }

    next();
};

export default authMiddleware;
