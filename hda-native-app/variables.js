import { 
    Dimensions, 
    Plataform 
} from 'react-native';

export const colors = {
    primaryColor: '#1d1d1d',
    backgroundColor: '#f5f5f5',
    lightGray: '#eee',
    gray: '#ccc',
    yellow: '#FFE433',
    activeGreen: '#23E84F',
    redAlert: '#FF3E33'
};

export const dimensions = {
    width: Dimensions.get('screen')['width'],
    height: Dimensions.get('screen')['height'],
    fontSize: Dimensions.get('screen')['fontScale']
};

export const operatingSystem = {
    getOS: () => Plataform.OS,
    getVersion: () => Plataform.Version
};

export const alignCenter = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}

export const intArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];