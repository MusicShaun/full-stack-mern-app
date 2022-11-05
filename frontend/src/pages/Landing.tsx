import Wall from './Wall';

type IProps = { 
  setBlogContent: React.Dispatch<React.SetStateAction<any | null>>;
  blogContent: any | null;
  blogFilter: any;
  clearListings: boolean;
  setClearListings: React.Dispatch<React.SetStateAction<any | null>>;
}


export default function Landing( {setBlogContent, blogContent, blogFilter, clearListings , setClearListings}: IProps) {


  return (
    <div> 
        <Wall 
          setBlogContent={setBlogContent}
          blogContent={blogContent}
          blogFilter={blogFilter}
          clearListings={clearListings}
          setClearListings={setClearListings}
          />
      </div>
  )
}