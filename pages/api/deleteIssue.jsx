// // Backend: editIssue API

// import { NextApiRequest, NextApiResponse } from 'next';
// import connectDb from '@/Middleware/mongoose';
// import Issue, { IIssue } from '@/Models/Issue';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         if (req.method === 'DELETE') {
//             const { id } = req.body;
//             console.log(id) // Use req.query to get the ID from the query parameters
//             if (!id) {
//                 return res.status(400).json({ error: "ID parameter is required" });
//             }
//             const deletedProduct = await Issue.findByIdAndDelete(id);

//             if (!deletedProduct) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Product not found',
//                 });
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: 'Product deleted successfully',
//             });
//         } else {
//             res.status(400).json({
//                 success: false,
//                 message: 'This method is not allowed',
//             });
//         }
//     }  catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
//     };



// export default connectDb(handler);
import Issue from "@/Models/Issue";
import connectDb from "@/Middleware/mongoose";

const handler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const { issueId } = req.body;

      if (!issueId) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required for deletion',
        });
      }

      const deletedProduct = await Issue.findByIdAndDelete(issueId);

      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'This method is not allowed',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in deleting the product',
      error: error.message,
    });
  }
};

export default connectDb(handler);

