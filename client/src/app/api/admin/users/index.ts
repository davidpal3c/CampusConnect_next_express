


// export default function UsersData(req, res) {
//     const { method } = req;

//     switch (method) {
//         case 'GET':
//             // Handle GET request
//             res.status(200).json({ message: 'GET request received' });
//             break;
//         case 'POST':
//             // Handle POST request
//             res.status(201).json({ message: 'POST request received' });
//             break;
//         case 'PUT':
//             // Handle PUT request
//             res.status(200).json({ message: 'PUT request received' });
//             break;
//         case 'DELETE':
//             // Handle DELETE request
//             res.status(200).json({ message: 'DELETE request received' });
//             break;
//         default:
//             res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//             res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }