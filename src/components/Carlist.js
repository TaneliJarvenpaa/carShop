import React,{useState,useEffect} from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Addcar from './Addcar';
import Editcar from './Editcar';
import Button from '@mui/material/Button';
import  {useRef} from 'react';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Carlist(){

    const [cars,setCars]=useState([]);
    const gridRef = useRef();
    useEffect(() => fetchData,[]);


    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
  
     }
     
     const deleteCar = () => {
      if (gridRef.current.getSelectedNodes().length > 0) 
      {    setCars(cars.filter((cars, index) =>      
        index !== gridRef.current.getSelectedNodes()[0].childIndex))  }
        else {    alert('Select row first');  
      }}

   const saveCar = (car) => {
      fetch('https://carstockrest.herokuapp.com/cars', {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(car)
      }) 
      .then(res => fetchData())
      .catch(err => console.error(err))
   }
   const updateCar = (car, link) => {
      fetch(link, {
         method: 'PUT', 
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(car)
      }) 
      .then(res => fetchData())
      .catch(err => console.error(err))
   }
     const columns = [  
        {
            field: 'brand',
            sortable: true,filter: true,floatingFilter: true,animateRows:true
         },
         {
            field: 'model',
            sortable: true,filter: true,floatingFilter: true,animateRows:true
         },
         {
            field: 'color',
            sortable: true,filter: true,floatingFilter: true,animateRows:true
         },
         {
            field: 'fuel',
            sortable: true,filter: true,floatingFilter: true,animateRows:true
         },
         {
            field: 'year',
            sortable: true,filter: true,floatingFilter: true,animateRows:true
         },
         {
            field: 'price',
            sortable: true,filter: true,floatingFilter: true,animateRows:true,
           
         },
         {
             headerName: '',
             width: 300,
             field: 'links.0.href',                   
             cellRenderer: params => <Editcar updateCar={updateCar} params={params} />
           }, {    
            headerName: '', 
            width: 100,
            field: 'links.0.href'
            , 
            cellRenderer: params =>     
            <IconButton onClick={() => deleteCar(params.value)}>    
                <DeleteForeverIcon />                       
            </IconButton>                            
        }
       ]
         
      
         

    return(
        <div className="ag-theme-material" style={{height: 600, width: '100'}} >
         <Addcar saveCar={saveCar}/>
         
         
         
            <AgGridReact
            columnDefs={columns}
            ref={gridRef}
            rowData={cars}
            animateRows={true}
            pagination={true}      
            paginationPageSize={15}
            rowSelection="single"
            onGridReady={ params => gridRef.current = params.api }
            >
            </AgGridReact>

        </div>
    )
}