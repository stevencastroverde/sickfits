import Navigation from './Nav';
const Header = () => {
   return ( <div>
        <div className="bar">
            <a href="">Sick Fits</a>
            <Navigation></Navigation>
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>Cart</div>


    </div>
   )

}

export default Header;