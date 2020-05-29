import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import MealCard from '../components/MealCard';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import Loading from '../components/Loading';

const MenuPage = (props) => {
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              'http://localhost:5000/api/datas',
              // localhostë¡œ ë°”ê¾¸ê¸°
            );
            setDatas(result.data);
            setIsLoading(true);
          };
       
          fetchData();
    }, []);
    
    return (
        <>
            <NavBar/>
            <Container>
                {/* ???????? ???? */}
                {/* <FormGroup>
                    <Label for="exampleCheckbox">??</Label>
                    <div>
                    <CustomInput type="checkbox" id="exampleCustomInline" label="??" inline />
                   
                    </div>
                </FormGroup> */}
            </Container>
            
                
                {isLoading ? 
                (<Container>
                    <Row xs="2" sm="2" md="4">
                        {datas.map((data) => 
                        <Col>
                        <MealCard
                            id = {data.id}
                            name = {data.name}
                            address = {data.address}
                            latitude = {data.latitude}
                            longitude = {data.longitude}
                            type = {data.type}
                            menu = {data.menu}
                            img = {data.img}
                            img_source = {data.img_source}
                        />
                        </Col>
                        ) 
                        }
                        </Row>
                </Container>)
                : <Loading/>
                }
                    
                
                
        </>
    );
}

export default MenuPage;