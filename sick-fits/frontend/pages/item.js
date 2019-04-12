import SingleItem from '../components/SingleItem';

const Home = props => {
    return (
        <div>
          <SingleItem id={props.query.id}></SingleItem>
        </div> 
  
    )
}


export default Home;