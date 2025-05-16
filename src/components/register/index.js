import React, { useState} from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const Register = () => {
    const navigate = useNavigate();
    const [participants, setParticipants] = useState({
        id_name_of_firm: "",
        id_card_brand_name: "",
        register_counter: "",
        id_firm_email: "",
        idcardsub : "",
    });

    const useTemplate1 = {idcardsub_rep_name:"", idcardsub_rep_mobile:"",idcardsub_rep_image:null};

    const [users, setUsers] = useState([useTemplate1]);

    const [count, setCount] = useState(1);

    const addRow = () => {
        setUsers([...users,useTemplate1]);
        setCount(count + 1);
    };

    const onChange = (e, index) =>{
        const { name, value } = e.target;
        if (name === "idcardsub_rep_mobile" && !/^\d*$/.test(value)) {
            return;
        }
        const updated = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updated);
    };

    const remove = (index) => {
        const filtered = [...users];
        filtered.splice(index, 1);
        setUsers(filtered);
        setCount(count - 1);
    };

    const onInputChange = (e) => {
        
        setParticipants({
            ...participants,
            [e.target.name]: e.target.value,
        }); 
        
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0]; 
        const updatedUsers = users.map((user, i) =>
            index === i ? { ...user, idcardsub_rep_image: file } : user
        );
        setUsers(updatedUsers);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("id_name_of_firm",participants.id_name_of_firm);
        data.append("id_card_brand_name",participants.id_card_brand_name);
        data.append("id_firm_email",participants.id_firm_email);
        data.append("register_counter",count);
        users.forEach((user, index) => {
            Object.keys(user).forEach((key) => {
                data.append(`idcardsub[${index}][${key}]`, user[key]);
            });
        });

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        
    
        if (v) {
        
            axios({
                url: "https://southindiagarmentsassociation.com/public/api/insert-participant-idcard",
                method: "POST",
                data,
                headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                if(res.data.code == '200'){
                    toast.success("Data Inserted Sucessfully", {
                        type: 'Success',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        onClose: () => navigate(`/thankyou`)
                    });
                    setParticipants({
                        id_name_of_firm: "",
                        id_card_brand_name: "",
                        id_firm_email: "",
                    });
                }else{
                    toast.error("Duplicate Entry", {
                        type: 'error',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                
            });
        }
        
      };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="container-fluid">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" id="addIndiv" className="sign-in-form">
                            <h2 className="title">Participant ID Cards</h2>
                            <div className="row" style={{width:"104%"}}>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <i className="fas fa-building"></i>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Firm Name"
                                            autoComplete="Name"
                                            name="id_name_of_firm"
                                            value={users.id_name_of_firm}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <i className="fas fa-user"></i>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Brand Name"
                                            autoComplete="Name"
                                            name="id_card_brand_name"
                                            value={users.id_card_brand_name}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <i className="fas fa-envelope"></i>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Firm Email Id"
                                            autoComplete="Name"
                                            name="id_firm_email"
                                            value={users.id_firm_email}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {
                                users.map((user, index)=>(

                                <div className="row" key={index} style={{width:"104%"}}>
                                    <div className="col-md-4">
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <TextField
                                                fullWidth
                                                label="Representative Name"
                                                required
                                                autoComplete="Name"
                                                name="idcardsub_rep_name"
                                                value={user.idcardsub_rep_name}
                                                onChange={e => {onChange(e, index);}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="input-field">
                                            <i className="fas fa-phone"></i>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Mobile No"
                                                inputProps={{ maxLength: 10, minLength: 10,  pattern: "[0-9]*"  }}
                                                autoComplete="Name"
                                                name="idcardsub_rep_mobile"
                                                value={user.idcardsub_rep_mobile}
                                                onChange={e => {onChange(e, index);}}
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="col-md-3">
                                        <div className="input-field">
                                            <i className="fas fa-image"></i>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Photo"
                                                type="file"
                                                autoComplete="Name"
                                                InputLabelProps={{ shrink: true }}
                                                name="idcardsub_rep_image"
                                                onChange={(e) => handleFileChange(e, index)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-1 col-1">
                                        <IconButton tabIndex="-1" onClick={() => remove(index)}>
                                            <DeleteIcon style={{color:'red'}}/>
                                        </IconButton>
                                    </div>
                                </div>
                            ))
                        }

                            <div className="row mt-4">
                                <div className="col-sm-6 col-md-6 col-xl-6 col-6">
                                    <input type="button" value="Add More" onClick={(e) => addRow(e)} className="btn solid" />
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-6 col-6">
                                    <input type="submit" value="Finish" onClick={(e) => onSubmit(e)} className="btn solid" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        {/* <div className="content">
                            <h3>South India Garment Association (SIGA)</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                        </div> */}
                        <img src="https://southindiagarmentsassociation.com/assets/images/events/bg-heading-web29.png" className="image" alt="" />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Register;