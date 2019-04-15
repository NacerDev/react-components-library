import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import logo from "../../icons/kodakone-logo-header.svg";
import style from "./style.scss"
class NavBar extends React.Component {
  state = {
    isOpen: false
  };
  toggle = e => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {

    return (
     
        <Navbar color="dark" dark expand="md" className={style["nav-bar"]}>
          <NavbarBrand href="/" className={style["nav-brand"]}> 
                <img alt="KODAKOne" src={logo} />
          </NavbarBrand>
     
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="m-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse> 
        </Navbar>
    )

  }
}



export default NavBar;