import {Card, CardContent, Divider, Stack} from "@mui/material";
import * as React from "react";
import {filtersConstant, orderConstant} from "../Feed";

export default function FilterFeed(props: any) {

    const {filters, setFilters, order, setOrder} = props;

    const handleChangeFilter = (index : number) => {
        const value = !filters[index];
        setFilters({...filters, [index]: value})
    }

    const handleChangeOrder = (index : number) => {
        const value = !order[index];
        setOrder({...order, [index]: value})
    }

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu" spacing={2}>
                    <ul>
                        {filtersConstant.map((filterElement, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleChangeFilter(index)}
                                    style={{ fontWeight: filters[index] ? 'bold' : 'normal' }}
                                >
                                    <span>{filterElement}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Divider />
                    <ul>
                        {orderConstant.map((orderElement, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleChangeOrder(index)}
                                    style={{ fontWeight: order[index] ? 'bold' : 'normal' }}
                                >
                                    <span>{orderElement}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </Stack>
            </CardContent>

        </Card>
    )
}
