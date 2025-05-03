
import helmet from "helmet";

const helmetMiddleware = (app: any) => {
    app.use(helmet({
        crossOriginResourcePolicy: false,                                                                           // Allow resources (like images) to load from other origins
        contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "https://apis.google.com"],                                                    // Firebase / Google Sign-In
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "img-src": ["'self'", "data:", "https://lh3.googleusercontent.com"],                                    // Google profile pictures
            "connect-src": ["'self'", process.env.CLIENT_ORIGIN || ""],                                             // Allow frontend origin
        }
        },
        referrerPolicy: { policy: "no-referrer" },
        frameguard: { action: "deny" },
        xssFilter: true,
        hidePoweredBy: true,
    }));
}

export default helmetMiddleware;    

// app.use(helmet({
//     crossOriginResourcePolicy: false, // Allow resources (like images) to load from other origins
//     contentSecurityPolicy: {
//       useDefaults: true,
//       directives: {
//         "default-src": ["'self'"],
//         "script-src": ["'self'", "https://apis.google.com"], // Firebase / Google Sign-In
//         "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//         "font-src": ["'self'", "https://fonts.gstatic.com"],
//         "img-src": ["'self'", "data:", "https://lh3.googleusercontent.com"], // Google profile pictures
//         "connect-src": ["'self'", process.env.CLIENT_ORIGIN || ""], // Allow frontend origin
//       }
//     },
//     referrerPolicy: { policy: "no-referrer" },
//     frameguard: { action: "deny" },
//     xssFilter: true,
//     hidePoweredBy: true,
//   }));