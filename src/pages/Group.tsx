import "./group.css"
import {useParams} from "react-router-dom";
import {Avatar, Box, Grid, Paper, Typography} from "@mui/material";


function Group() {

    let {groupID} = useParams();

    return (<>
            {/*<div className="profile">
            <div className="profileRight">
                <div className="profilerightTop">
                    <div className="profileCover">
                        <img className='profileCoverImg' src="../assets/persons/4.png" alt="" />
                        <img className='profileUserImg' src="../assets/persons/1.jpg" alt="" />
                        
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName'>Nombre de grupo</h4>
                        <span className='profileInfoDesc'>descripción</span>
                        <button className='groupButton'>Unirme</button>
                    </div>
                </div>


            </div>

        </div>*/}
            <Paper
                sx={{
                    position: 'relative',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(../assets/persons/4.png)`,
                    height: "25vh",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
            </Paper>
            <Paper
                sx={{
                    position: 'relative',
                    color: '#EFECEB',
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: '#EFECEB',
                    }}
                />
                <Grid container>
                    <Grid item md={10}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: {xs: 3, md: 3},
                                pr: {md: 0},
                            }}
                        >
                            <Typography variant="h5" color="black" gutterBottom>
                                Nombre de grupo
                            </Typography>
                            <Typography variant="subtitle1" color="black" paragraph>
                                Descripción
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={2} sx={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',}}>
                        <Box
                            sx={{
                                position: 'relative',

                            }}
                        >
                            <Avatar
                                alt="Nombre"
                                src="../assets/persons/2.png"
                                sx={{ width: "12vh", height: "12vh" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Group