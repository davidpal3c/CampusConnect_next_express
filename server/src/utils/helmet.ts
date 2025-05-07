
import helmet from "helmet";

const helmetMiddleware = (app: any) => {
    app.use(helmet({
        crossOriginResourcePolicy: false,                                                                           // Allow resources (like images) to load from other origins
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "default-src": ["'self'"],
                "script-src": [
                    "'self'", 
                    "'unsafe-inline'",                                                                                          // Required for Next.js
                    "https://apis.google.com",
                    "https://www.googletagmanager.com",                                                                         // If using GTM
                    // `'nonce-${process.env.CSP_NONCE}'`                                                                          // For dynamic scripts
                ],
                "style-src": [
                    "'self'",
                    "'unsafe-inline'",                                                                                          // Required for MUI and inline styles
                    "https://fonts.googleapis.com"
                ],
                "font-src": [
                    "'self'",
                    "https://fonts.gstatic.com",
                    // "data:"                                                                                                     // For MUI icons
                ],
                "img-src": [
                    "'self'",
                    "data:",
                    "https://lh3.googleusercontent.com",
                    "https://firebasestorage.googleapis.com",
                    "https://i.ibb.co",
                    "https://*.googleusercontent.com"                                                                           // Wildcard for all subdomains
                ],
                "connect-src": [
                    "'self'",
                    process.env.CLIENT_ORIGIN || "",
                    // process.env.NEXT_PUBLIC_BACKEND_URL || "",                                                                  // self, API endpoint
                    "https://*.googleapis.com"                                                                                  // For Firebase/Google services
                ],
                "frame-src": [
                    "'self'",
                    "https://accounts.google.com"                                                                               // For Google Sign-In iframe
                ],
                "object-src": ["'none'"],                                                                                       // Disallows plugins like Flash
                "base-uri": ["'self'"],                                                                                         // Restricts base tag URLs
                "form-action": ["'self'"]                                                                                       // Restricts form submission targets
            }
        },
        // contentSecurityPolicy: {
        //     useDefaults: true,
        //     directives: {
        //         "default-src": ["'self'"],
        //         "script-src": ["'self'", "https://apis.google.com"],                                                    // Firebase / Google Sign-In
        //         "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        //         "font-src": ["'self'", "https://fonts.gstatic.com"],
        //         "img-src": ["'self'", "data:", "https://lh3.googleusercontent.com"],                                    // Google profile pictures
        //         "connect-src": ["'self'", process.env.CLIENT_ORIGIN || ""],                                             // Allow frontend origin
        //     }
        // },
        referrerPolicy: { policy: "no-referrer" },
        frameguard: { action: "sameorigin" },
        xssFilter: true,
        hidePoweredBy: true,
        hsts: {                                                                                                             // sets HTTP Strict Transport Security (HSTS) header: it tells browsers to only connect to the site using HTTPS
            maxAge: 63072000, // 2 years in seconds
            includeSubDomains: true,
            preload: true
        }
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