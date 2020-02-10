import React from 'react';
import CreatePostModal from './CreatePostModal';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarText,
    Collapse,
    Container
} from 'reactstrap';

class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar className="navbar-custom" expand="sm">
                    <div className="mr-auto">
                        <NavbarBrand href="/">
                            <i className="fas fa-home"></i>
                        </NavbarBrand>
                    </div>
                    
                        <NavbarText>
                            <i className="far fa-lightbulb"></i>
                        </NavbarText>
                    
                    <div className="ml-auto">
                        <NavbarToggler onClick={this.toggle}>
                            <i className="fas fa-bars"></i>
                        </NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} className="ml-auto" navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <CreatePostModal />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default CustomNavbar;