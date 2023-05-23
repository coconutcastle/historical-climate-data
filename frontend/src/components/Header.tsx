import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Navbar
      id='header'
      bg='primary'
      fixed='top'
      expand='lg'
    >
      <Navbar.Toggle onClick={toggle} className="mr-auto">
        <i className='material-icons'>arrow_drop_down</i>
      </Navbar.Toggle>
      <Navbar.Collapse appear={!collapsed}>
        <Nav.Item>
          <NavLink to='/'>
            Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/download'>
            Download
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/visualize'>
            Visualize
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/documentation'>
            Documentation
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/api'>
            API
          </NavLink>
        </Nav.Item>
      </Navbar.Collapse>
    </Navbar>
  )
}