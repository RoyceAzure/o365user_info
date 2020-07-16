import {CosmosClient} from "@azure/cosmos";
import React from "react";
export class CosmosService extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.state.clientId = props.clientId;
        this.state.collectionId = props.collectionId;
        this.state.tableId = props.tableId;
    }

    initCosmos = e=>{
        const client = new CosmosClient()
    }
    render()
    {
        return <p>cosmosService</p>
    }
} 