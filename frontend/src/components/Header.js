import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand> PhoneShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart px-2'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <Dropdown>
                  <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                    {userInfo.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user px-2'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
