const mongoose=require('mongoose');
const DB='mongodb+srv://govind:govind@cluster0.heq3q.mongodb.net/mernstack?retryWrites=true&w=majority';
// const DB="mongodb://localhost:27017/mernstack";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log('connection successful');
}).catch((err)=>{
    console.log(err);
}
);