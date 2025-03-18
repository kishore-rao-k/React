import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements ,RouterProvider  } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPage,{jobLoader} from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";


const App = () => {
  //add new job
  const addJob = async (newJob) => { 
    try {
      const res = await fetch('/api/jobs', {  
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      });

      if (!res.ok) {
        throw new Error('Failed to add job');
      }

      return;
    } catch (error) {
      console.error(error);
    }
  };
  
  // delete job
  const deleteJob = async(id)=>{
    // console.log('delete',id)
    try {
      const res = await fetch(`/api/jobs/${id}`, {  
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to add job');
      }

      return;
    } catch (error) {
      console.error(error);
    }
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element ={<MainLayout/>} >
    <Route index element ={<HomePage/>}/>
    <Route  path="/jobs" element={<JobsPage/> }/>
    <Route  path="/add-job" element={<AddJobPage  addJobSubmit={addJob} /> }/>
    <Route  path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/> } loader={jobLoader}/>
    <Route  path="*" element={<NotFound/> }/>
    </Route>)
  )

  return <RouterProvider router={router}/>;
}; 

export default App;
