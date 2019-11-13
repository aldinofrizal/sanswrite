module.exports = (err,req,res,next) => {
    console.log('<=====masuk erorhandler')
    if(err.name === 'ValidationError'){
        let message = []
        for(let key in err.errors){
            message.push(err.errors[key].message)
        }
        res.status(400).json({msg : message})
    }else if(err.name === 'CastError'){
        res.status(422).json({message: 'Cannot find data to proccess'})
    }else if(err.name === 'MongoError'){
        res.status(422).json({message: 'email already used'})
    }else if(err.name === 'LoginError'){
        res.status(403).json({message: 'wrong email/password'})
    }else if(err.name === 'CreateError'){
        res.status(422).json({ message : ['all field are required']})
    }else if(err.name === 'AuthenticationError'){
        res.status(403).json({ message : 'authentication failed'})
    }

    else{
        res.json(err)
    }
}