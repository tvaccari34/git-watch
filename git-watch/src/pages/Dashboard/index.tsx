import React from 'react';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
    return(
        <>
            <img src={logoImg} alt="GitWatch"/>
            <Title>Explore repositories on Github</Title>

            <Form>
                <input placeholder="type repository's name"/>
                <button>Search</button>
            </Form>

            <Repositories>
                <a href="test">
                    <img src="https://avatars3.githubusercontent.com/u/11893246?s=460&u=885f65e47c64046d27c22eec9f9b66f65f277477&v=4" alt="Tiago Vaccari"/>
                </a>
            </Repositories>
        </>
    )
}

export default Dashboard;