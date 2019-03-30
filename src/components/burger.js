import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';
// import {CustomIcon} from 'react-burger-menu'
 
export default class SlideMenu extends React.Component {
 
    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false
        }
      }
    
      // This keeps your state in sync with the opening/closing of the menu
      // via the default means, e.g. clicking the X, pressing the ESC key etc.
      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
      }
      
      // This can be used to close the menu, e.g. when a user clicks a menu item
      closeMenu () {
        this.setState({menuOpen: false})
      }
    
      // This can be used to toggle the menu, e.g. when using a custom icon
      // Tip: You probably want to hide either/both default icons if using a custom icon
      // See https://github.com/negomi/react-burger-menu#custom-icons
      toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
      }
    render(){

  return (
      <div>
    <Menu  isOpen={this.state.menuOpen}
    onStateChange={(state) => this.handleStateChange(state)}>
      <Link to='/' className='menu-item' onClick={() => this.closeMenu()} >Home</Link>

        <Link className="menu-item" to='/product/all' onClick={() => this.closeMenu()}>
       Shop
      </Link>

      
    </Menu>
    {/* <CustomIcon onClick={() => this.toggleMenu()} /> */}
    </div>
  );
};
}