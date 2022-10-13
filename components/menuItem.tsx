// import {useState} from "react";

interface Props {
  itemTitle: string;
  icon: any;
  iconColor: string;
}

// const [hoveredItem, setHoveredItem ] = useState(false);

const MenuItem: React.FC<Props> = ({ itemTitle, icon, iconColor }) => {
  return (
    <div className="flex items-center justify-start " 
    // onMouseEnter={()=>{setHoveredItem(true)}}
    // onMouseLeave={()=>{setHoveredItem(false)}}
    >
      <div className="pb-1 pr-1.5  text-sm" style={{ color: iconColor }}>
        {icon} 
      </div>
      {/* <h3 className= { hoveredItem? "font-normal text-base text-blue-primary" : "font-normal text-base text-blue-light"}>{itemTitle}</h3> */}
      <h3 className=" font-normal text-sm text-blue-primary hover:text-blue-light">{itemTitle}</h3>
    </div>
  );
};

export default MenuItem;
