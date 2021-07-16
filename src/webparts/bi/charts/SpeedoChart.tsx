import * as React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
// import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";
// const client = new MongoClient(uri);


const SpeedoChart = () => {

    const [max, setMax] = React.useState(0);
    const [min, setMin] = React.useState(0);
    const [current, setCurrent] = React.useState(0);

    // const getData = async() => {
    //     await client.connect();
    //     const database= client.db('sharepoint');
    //     const permits = database.collection("View for POC");


    //     const _max = permits.find().sort({count: -1}).limit(1);
    //     const _min = permits.find().sort({count: 1}).limit(1);
    //     const _current = permits.find({"_id": `${new Date().getFullYear()}-${("0" + new Date().getMonth()).slice(-2)}`});
    //     console.log(_max);
    //     console.log(_min);
        
    //     // setMax(_max);
    //     // setMin(_min);
        
    // };

    // React.useEffect(() => {
    //     getData();
    // },[]);

    return (
        <ReactSpeedometer

        />
    );
};

export default SpeedoChart;
