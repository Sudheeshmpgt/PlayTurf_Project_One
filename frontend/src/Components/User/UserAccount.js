import React, { useContext, useEffect } from 'react'
import { Avatar, Box, Fab, Grid, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../Store/usercontext';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance'

function UserAccount() {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    
    useEffect(() => {
        const id = localStorage.getItem("userId")
        axios.get(`admin_panel/user_management/update/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setUser(res.data.user[0])
            })
    },[])

    const edit =(id)=>{
        navigate('/useredit', { state: { id: id } })
    }

    const Id = user ? user._id : userId

    return (
        <Grid container>
            <Box height='500px'
                width='35%'
                margin='30px auto'
                borderRadius='55px 0 55px 0'
                elevation={3}
                backgroundColor='rgba(255, 255, 255, 0.45)'>
                <Box display='flex'
                    justifyContent='space-between'>
                    <Avatar sx={{
                        height: 100,
                        width: 100,
                        margin: '10px'
                    }} ><img alt='Profile' src={user? user.userImg:''}></img></Avatar> 
                    <Box>
                        <Fab size='small'
                            onClick={()=>edit(Id)}
                            sx={{ margin: 3 }}
                            color='secondary'>
                            <EditIcon sx={{ fontSize: 20 }} />
                        </Fab>
                    </Box>

                </Box>
                <Box display='flex'
                    flexDirection='column'
                    justifyContent='space-evenly'>
                        <Box borderBottom={1} width='93%' margin='0px auto'>
                        <Typography
                        textAlign='center'
                        margin={2}
                        fontSize={30}
                        fontWeight={600} >PROFILE</Typography>
                        </Box>
                    <Typography
                        fontWeight={600}
                        marginLeft='10%'
                        marginTop='20px'>
                        Name :
                    </Typography>
                    <Typography
                    //  borderBottom={1}
                    //  width={410}
                        marginLeft='10%'
                        marginTop='3px'>
                        {user ? user.name: ''}
                    </Typography>
                    <Typography
                        fontWeight={600}
                        marginLeft='10%'
                        marginTop='20px'>
                        E-mail :
                    </Typography>
                    <Typography
                    //  borderBottom={1}
                    //  width={410}
                        marginLeft='10%'
                        marginTop='3px'>
                        {user ? user.email: ''}
                    </Typography>
                    <Typography
                        fontWeight={600}
                        marginLeft='10%'
                        marginTop='20px'>
                        Phone :
                    </Typography>
                    <Typography
                    //  borderBottom={1}
                    //  width={410}
                        marginLeft='10%'
                        marginTop='3px'>
                        {user ? user.phone : ''}
                    </Typography>
                    <Typography
                        fontWeight={600}
                        marginLeft='10%'
                        marginTop='20px'>
                        Address :
                    </Typography>
                    <Typography
                    // borderBottom={1}
                    // width={410}
                        marginLeft='10%'
                        marginTop='3px'>
                        {user ? user.address : ''}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default UserAccount