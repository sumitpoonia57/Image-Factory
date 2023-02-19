import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const router=express.Router();
const configuration=new Configuration({
    apiKey:process.env.OPEN_API_KEY,
})
const openai=new OpenAIApi(configuration);
router.route('/').get((req,res)=>{
    res.send('Hello from AI Image Gen!');

});
router.route('/').post(async(req,res)=>{
    try{
        const{prompt}=req.body;
        const aiResponse=await openai.createImage({
            prompt:"a white siamese cat",
            n:1,
            size:'1024*1024',
            response_format:'b64,json',
        });
        const image=aiResponse.data.data[0].b64_json;
        res.status(200).json({photo:image});  
    }
    catch(error){
        console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});


export default router;