import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import LandingMap from '../components/LandingMap';
import { CustomInput } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';


const LandingPage = (props) => {
    const [datas, setDatas] = useState([]);
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [all, setAll] = useState(false);
    const [Kfood, setKfood] = useState(false);
    const [Cfood, setCfood] = useState(false);
    const [Jfood, setJfood] = useState(false);
    const [meat, setMeat] = useState(false);
    const [snackfood, setSnackfood] = useState(false);
    const [pub, setPub] = useState(false);
    const [fastfood, setFastfood] = useState(false);
    const [cafe, setCafe] = useState(false);
    const [etc, setEtc] = useState(false);
    
   
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
    
    // filtereddatas 처리 + isloading변경
    
    useEffect(() => {
        setIsLoading(false);
        let result = [];
        const states = [Kfood, Cfood, Jfood, meat, snackfood, pub, fastfood, cafe, etc];
        const types = [['한식'], ['중식'], ['일식'], ['고기'], ['분식'], ['호프', '술집'], ['패스트푸드'], ['카페', '디저트'], ['기타']];
        for(let i = 0; i < states.length; i++) {
            if(states[i] === true) {
                const temp = types[i];
                for(let j = 0; j < datas.length; j++) {
                    for(let k = 0; k < temp.length; k++) {
                        if(datas[j].type === temp[k]) {
                            result.push(datas[j]);
                        }
                    }
                }
            }
        }
        setFilteredDatas(result);
        setIsLoading(true);
    }, [Kfood, Cfood, Jfood, meat, snackfood, pub, fastfood, cafe, etc]);

    useEffect(() => {
        if(all === true) {
            setKfood(true);
            setCfood(true);
            setJfood(true);
            setMeat(true);
            setSnackfood(true);
            setPub(true);
            setFastfood(true);
            setCafe(true);
            setEtc(true);
        }
        else {
            setKfood(false);
            setCfood(false);
            setJfood(false);
            setMeat(false);
            setSnackfood(false);
            setPub(false);
            setFastfood(false);
            setCafe(false);
            setEtc(false);
        }
    }, [all]);

    return (
        <>
            <NavBar/>
            <Container style={{
                paddingTop : '1.5rem'
            }}>
                
                <Row>
                    <Col>
                        <CustomInput type="switch" id="all" label="전체"
                        checked={all}
                        onChange={()=> setAll(!all)}
                        />
                    </Col>
                </Row>
                <Row xs="3" sm="3" md="5">
                    <Col>
                        <CustomInput type="checkbox" id="Kfood" label="한식" 
                        checked={Kfood}
                        onChange={()=>setKfood(!Kfood)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="Cfood" label="중식"
                        checked={Cfood}
                        onChange={()=>setCfood(!Cfood)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="Jfood" label="일식"
                        checked={Jfood}
                        onChange={()=>setJfood(!Jfood)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="meat" label="고기"
                        checked={meat}
                        onChange={()=>setMeat(!meat)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="snackfood" label="분식"
                        checked={snackfood}
                        onChange={()=>setSnackfood(!snackfood)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="pub" label="호프/술집"
                        checked={pub}
                        onChange={()=>setPub(!pub)}
                        />
                    </Col>
                
                    <Col>
                        <CustomInput type="checkbox" id="fastfood" label="패스트푸드"
                        checked={fastfood}
                        onChange={()=>setFastfood(!fastfood)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="cafe" label="카페/디저트"
                        checked={cafe}
                        onChange={()=>setCafe(!cafe)}
                        />
                    </Col>
                    <Col>
                        <CustomInput type="checkbox" id="etc" label="기타"
                        checked={etc}
                        onChange={()=>setEtc(!etc)}
                        />
                    </Col>

                </Row>
            {datas ? <LandingMap
                datas = {datas}
            /> : 'loading...'}
            </Container>


                
                    
                
                
        </>
    );
}


export default LandingPage;