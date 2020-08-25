const {db,employees,departments} = require('./db');
const path =require('path');


const express = require('express');
const app = express();

app.use(require('body-parser').json());

app.use('/dist',express.static(path.join(__dirname,"dist")));

app.get('/',(req,res,next)=> res.sendFile(path.join(__dirname,"index.html")));

app.get('/api/departments',async (req,res,next) =>{
  const results = await departments.findAll();
  res.json(results)

})

app.get('/api/employees',async (req,res,next) =>{
  try {
    const results = await employees.findAll({order:[['firstName',"ASC"]]});
    res.json(results)

  } catch (error) {
    next(error)
  }


})

app.delete('/api/employees/:employeeId',async(req,res,next)=>{
  try {
   const employee= await employees.findByPk(req.params.employeeId);
   employee.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }

})

app.put('/api/employees/:employeeId', async(req,res,next) =>{
  try {

    const employee =await employees.findByPk(req.params.employeeId);
    await employee.update(req.body);

    res.send(employee);
  } catch (error) {
    next(error)
  }
})

app.use((err,req,res,next)=>{

  res.send(`ERROR
  ${err}`)
})

async function syncAndStart(){
  await db.sync();

  port= process.env.PORT || 1337;
  app.listen(port, () => console.log(`listening on port ${port}`))

}

syncAndStart();
