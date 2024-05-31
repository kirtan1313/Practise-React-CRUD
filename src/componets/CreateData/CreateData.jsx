import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import generat from 'generate-unique-id';
import { getData } from '../../service/Helper';


function CreateData() {

    const [input, setInput] = useState({
        id: '',
        fname: '',
        email: '',
        ProName: '',
        MoNumber: '',
        price: ''
    })


    const [viewdata, setViewData] = useState(getData("myData"));


    const handleChange = (e) => {

        const { name, value } = e.target;

        setInput({ ...input, [name]: value });

    }


    const handleSubmit = (e) => {
        e.preventDefault();


        // const { fname, email, ProName, MoNumber, price } = input;
        // if (!fname || !email || !ProName || !MoNumber || !price) {
        //     alert("Please fill all the fields");
        // }



        console.log(input);

        if (input.id) {

            let record = viewdata;
            let updatRecord = record.map((rec) => {

                if (rec.id === input.id) {
                    return rec = input
                }
                return rec

            })
            setViewData(updatRecord);
        } else {

            const obj = {
                ...input,
                id: generat({ length: 5, useLetters: false })
            }

            setViewData([...viewdata, obj]);
        }

        setInput({
            id: '',
            fname: '',
            email: '',
            ProName: '',
            MoNumber: '',
            price: ''
        });
    }


    const handleEdit = (id) => {

        console.log("hello", id);

        let record = viewdata;
        let singleRecord = record.filter((rec) => {
            return rec.id == id
        })

        setInput(singleRecord[0]);
    }

    const handleDelete = (id) => {

        let record = viewdata;
        let deletData = record.filter((rec) => {
            return rec.id !== id
        })

        setViewData(deletData);
    }

    const handleRecet = () => {
        localStorage.removeItem("myData");
        setViewData([]);
    }

    useEffect(()=>{
        localStorage.setItem("myData",JSON.stringify(viewdata))
    },[viewdata])


    return (
        <>
            <div>
                <div className='d-flex'>
                    <form class="form" onSubmit={handleSubmit}>
                        <input type="text" class="input" value={input.id} name='id' hidden />

                        <h2 className='d-flex'>
                            Product
                        </h2>
                        <input type="text" class="input" value={input.fname} placeholder="Enter your name" name='fname' onChange={handleChange} />
                        <input type="text" class="input" value={input.email} placeholder="Enter your email" name='email' onChange={handleChange} />
                        <input type="text" class="input" value={input.ProName} placeholder="Enter your Product Name" name='ProName' onChange={handleChange} />
                        <input type="text" class="input" value={input.MoNumber} placeholder="Enter your Model Number" name='MoNumber' onChange={handleChange} />
                        <input type="number" class="input" value={input.price} placeholder="Enter your Price" name='price' onChange={handleChange} />

                        <button type='submit'>Submit</button>
                        <button type='button' onClick={() => handleRecet()}>Recet</button>

                    </form>
                </div>





                <div class="container py-5">
                    <table class="rwd-table">
                        <thead>
                            <tr>
                                <th>Supplier Code</th>
                                <th>Supplier Name</th>
                                <th>Supplier Email</th>
                                <th>Product Name</th>
                                <th>Model Number</th>
                                <th>Net Amount</th>
                                <th>Edit Order</th>
                                <th>Delete Order</th>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                viewdata.map((data) => {
                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.fname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.ProName}</td>
                                            <td>{data.MoNumber}</td>
                                            <td>{data.price}</td>
                                            <td className='btn btn-info' onClick={() => handleEdit(data.id)}>Edit</td>
                                            <td className='btn btn-danger' onClick={() => handleDelete(data.id)}>Delete</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>



                {/* <div className="container py-5">
                    <Table striped bordered hover border border-radius>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Email Id</th>
                                <th>Product Name</th>
                                <th>Model Number</th>
                                <th>Price</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                viewdata.map((data) => {
                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.fname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.ProName}</td>
                                            <td>{data.MoNumber}</td>
                                            <td>{data.price}</td>
                                            <td className='btn btn-info' onClick={() => handleEdit(data.id)}>Edit</td>
                                            <td className='btn btn-danger' onClick={() => handleDelete(data.id)}>Delete</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div> */}


            </div>
        </>
    )
}

export default CreateData;
