import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Input,
    InputGroup,
    Button,
    InputGroupText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import marvelLogo from '../../assets/marvel-logo.png';
import Icon from '@mdi/react';
import { mdiMagnify, mdiCloseCircleOutline } from '@mdi/js';

const NavBar = ({ searchText, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const clear = () => {
        onChange('');
    };

    return (
        <Navbar style={{ backgroundColor: '#e03233' }} expand='md' fixed='top' id='navbar-lg'>
            <NavbarBrand href={'/'}>
                <img src={marvelLogo} alt='Netflix' width='150px' height='50px' />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <InputGroup>
                            <InputGroupText>
                                <Icon path={mdiMagnify} size={1} color='red' />
                            </InputGroupText>
                            <Input
                                type='text'
                                placeholder='Search for comics...'
                                value={searchText}
                                onChange={handleChange}
                                name='search'
                            />
                            {searchText.length > 0 && (
                                <Button style={{ backgroundColor: 'white' }} onClick={clear}>
                                    <Icon path={mdiCloseCircleOutline} size={1} color='red' />
                                </Button>
                            )}
                        </InputGroup>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

NavBar.propTypes = {
    searchText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default NavBar;
