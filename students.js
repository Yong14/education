let fs = require('fs');

exports.find = function(url,callback){
    fs.readFile(url,'utf8',(err,data)=>{
        callback(err,JSON.parse(data).student)
    })
}

exports.findById = function(url,id,callback){
    fs.readFile(url,'utf8',(err,data)=>{
        if(!err){
            let arr = JSON.parse(data).student;
            let stu = arr.find((item)=>{
                return item.id == id;
            })
            console.log(arr)
            callback(stu);
        }
    });

}

exports.save = function(url,newData){
    fs.readFile(url,'utf8',(err,data)=>{
        if(!err){
            let studentDb = JSON.parse(data).student;
            console.log(studentDb[studentDb.length-1]);
            if(studentDb.length==0){
                newData.id = 0;
            }else{
                newData.id = parseInt(studentDb[studentDb.length-1].id) + 1;
            }
            
            studentDb.push(newData);

            fs.writeFile(url,JSON.stringify({student:studentDb}),err=>{
                if(!err){
                    console.log(写入成功);
                }
            
            })

        }
    })
}

exports.updata = function(url,id,newStu){
    fs.readFile(url,'utf8',(err,data)=>{
        if(!err){
            let arr = JSON.parse(data).student;
            
            let stu = arr.find((item)=>{
                return item.id == id;
            });
            console.log(stu);
            for(let k in newStu){
                stu[k] = newStu[k];
            };
            console.log(stu);
            fs.writeFile(url,JSON.stringify({student:arr}),(err)=>{
                if(!err){
                    console.log('修改成功');
                }
            })
        }
    })
}

exports.dalete = function(url,id){
    fs.readFile(url,'utf8',(err,data)=>{
        if(!err){
            let arr = JSON.parse(data).student;
            let index = 0;
            for(var i=0; i<arr.length; i++){
                if(arr[i].id == id){
                    index = i;
                }
            }
            arr.splice(index,1);
            fs.writeFile(url,JSON.stringify({student:arr}),err=>{
                if(!err){
                    console.log('删除成功');
                }
            })
        }
    })
}