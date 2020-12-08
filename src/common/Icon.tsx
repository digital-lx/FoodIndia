import React, {FunctionComponent} from 'react';
// @ts-ignore
import { Icon } from 'galio-framework';

type props = {
  name:string,
  color:string,
  size:number,
  family:string,
  onPress?:() => {},
  style?:any
}
const IconExtra:FunctionComponent<props> =
    ({
name,color,size,family,onPress,style
     }) => {
      return <Icon name={name} family={family} size={size} color={color} onPress={onPress} style={style} />;
}

export default IconExtra;
