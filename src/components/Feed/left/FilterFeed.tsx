import {Card, CardContent, Divider, Grid, IconButton, Stack} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {TbSortAscendingLetters, TbSortDescendingLetters} from "react-icons/tb";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";

export default function FilterFeed(props: any) {

    const {filters, setFilters, orders, setOrders, descending, setDescending} = props;

    const [openOrder, setOpenOrder] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);

    const handleChangeFilter = (filter: string, value: string) => {
        if (filters.filter === filter && filters.value === value) {
            setFilters({filter: "", value: ""});
        } else {
            setFilters({filter: filter, value: value});
        }
    };

    const handleChangeOrder = (order: string) => {
        if (orders.order === order) {
            setOrders({order: ""});
        } else {
            setOrders({order: order});
        }
    };

    const handleChangeDescending = (value: string) => {
        setDescending(value);
    };

    const handleClick = (orderOrFilter: string) => {
        if (orderOrFilter === "order") {
            setOpenOrder(!openOrder)
        } else {
            setOpenFilters(!openFilters)
        }
    };

    const startOfWeeK = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD');
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
    const startOfYear = dayjs().startOf('year').format('YYYY-MM-DD');

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu" spacing={2}>
                    <ul>
                        <li>
                            <ListItemButton onClick={() => handleClick("filter")} sx={{marginBottom: 1}}>
                                <ListItemText primary="Filtrar por"/>
                                {openFilters ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                        </li>

                        <Collapse in={openFilters} timeout="auto" unmountOnExit>
                            <li>
                                <button>
                                    <span>Clasificación</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("clasification", "Académico")}
                                    style={{
                                        fontWeight: filters.filter === "clasification" && filters.value === "Académico" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>Académico</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("clasification", "Cultural")}
                                    style={{
                                        fontWeight: filters.filter === "clasification" && filters.value === "Cultural" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>Cultural</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("clasification", "Ocio")}
                                    style={{
                                        fontWeight: filters.filter === "clasification" && filters.value === "Ocio" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>Ocio</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("clasification", "Otro")}
                                    style={{
                                        fontWeight: filters.filter === "clasification" && filters.value === "Otro" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>Otro</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Reconocido</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("recognized", "true")}
                                    style={{
                                        fontWeight: filters.filter === "recognized" && filters.value === "true" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>Si</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("recognized", "false")}
                                    style={{
                                        fontWeight: filters.filter === "recognized" && filters.value === "false" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>No</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Fecha de creación</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("date", startOfWeeK)}
                                    style={{
                                        fontWeight: filters.filter === "date" && filters.value === startOfWeeK ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>En la última semana</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("date", startOfMonth)}
                                    style={{
                                        fontWeight: filters.filter === "date" && filters.value === startOfMonth ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>En el último mes</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("date", startOfYear)}
                                    style={{
                                        fontWeight: filters.filter === "date" && filters.value === startOfYear ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>En el último año</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Miembros</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("members", "5")}
                                    style={{
                                        fontWeight: filters.filter === "members" && filters.value === "5" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>+5</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("members", "15")}
                                    style={{
                                        fontWeight: filters.filter === "members" && filters.value === "15" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>+15</span>
                                </button>
                                <button
                                    onClick={() => handleChangeFilter("members", "25")}
                                    style={{
                                        fontWeight: filters.filter === "members" && filters.value === "25" ? 'bold' : 'normal',
                                        marginLeft: "1em"
                                    }}
                                >
                                    <span>+25</span>
                                </button>
                            </li>
                            {/*<li>
                                <button
                                    onClick={() => handleChangeFilter("topics", "one")}
                                    style={{fontWeight: filters.filter === "topics" ? 'bold' : 'normal'}}
                                >
                                    <span>topics</span>
                                </button>
                            </li>*/}
                        </Collapse>
                    </ul>
                    <Divider/>
                    <ul>

                        <li>
                            <ListItemButton onClick={() => handleClick("order")} sx={{marginBottom: 1}}>
                                <ListItemText primary="Ordenar por"/>
                                {openOrder ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                        </li>

                        <Collapse in={openOrder} timeout="auto" unmountOnExit>
                            <li>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Grid container justifyContent="center">
                                            <IconButton type="submit" aria-label="descending"
                                                        onClick={() => handleChangeDescending("no")}>
                                                <TbSortAscendingLetters color={descending === "no" ? "black" : "grey"} size={25}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container justifyContent="center">
                                            <IconButton type="submit" aria-label="descending"
                                                        onClick={() => handleChangeDescending("yes")}>
                                                <TbSortDescendingLetters color={descending === "no" ? "grey" : "black"}
                                                                         size={25}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleChangeOrder("date")}
                                    style={{fontWeight: orders.order === "date" ? 'bold' : 'normal'}}
                                >
                                    <span>Fecha de creación</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleChangeOrder("members")}
                                    style={{fontWeight: orders.order === "members" ? 'bold' : 'normal'}}
                                >
                                    <span>Miembros</span>
                                </button>
                            </li>
                        </Collapse>
                    </ul>
                </Stack>
            </CardContent>

        </Card>
    )
}
