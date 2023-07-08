import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function Stars (prop) {
    //  0       <=  star <  1.1    : 1
    //  1.1     <=  star <  1.6    : 1.5
    //  1.6     <=  star <  2.1    : 2
    //  2.1     <=  star <  2.6    : 2.5
    //  2.6     <=  star <  3.1    : 3
    //  3.1     <=  star <  3.6    : 3.5
    //  3.6     <=  star <  4.1    : 4
    //  4.1     <=  star <  4.6    : 4.5
    //  4.6     <=  star <=  5     : 5
    const stars=prop.stars
    const color=prop.color!==undefined? prop.color: "primary";
    if(stars>=4.6) return(<><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /></>);
    else if(stars>=4.1) return(<><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarHalfIcon color={color} /></>);
    else if(stars>=3.6) return(<><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarOutlineIcon color={color} /></>);
    else if(stars>=3.1) return(<><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarHalfIcon color={color} /><StarOutlineIcon color={color} /></>);
    else if(stars>=2.6) return(<><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /></>);
    else if(stars>=2.1) return(<><StarIcon color={color} /><StarIcon color={color} /><StarHalfIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /></>);
    else if(stars>=1.6) return(<><StarIcon color={color} /><StarIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /></>);
    else if(stars>=1.1) return(<><StarIcon color={color} /><StarHalfIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /></>);
    else return(<><StarIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon color={color} /><StarOutlineIcon /></>);
}