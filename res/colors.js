/**
 * Projede kullanılan bütün renkler burada tanımlanmalı ve bu dosyadan import edilmelidir.
 * Gereksiz tanımlamalardan uzak durulmalı.
 *
 * Örneğin: splashBackground, mainBackground gibi tanımlanmamalıdır.
 * Bazı istisnai durumlar dışında aynı renkler mümkün mertebe ortak gruplanmalıdır.
 *
 * Bunun yerine:
 *   Ana Renkler       : primary, secondary, light, dark, muted
 *   Durum Renkleri    : danger, success, info, warning
 *   İstisnai Durumlar : shadow, card
 *
 *
 * Renk kodununun ismini bulan site:
 *   https://www.color-blindness.com/color-name-hue/
 *
 *
 * Örnek kullanım:
 * import { colors } from 'assets';
 *
 * colors.primary
 */

const colors = {
  primary: '#F54B64',
  secondary: '#EE7d28',
  background: '#F5FCFF',
  lightGray: '#a9aeb2',
  secondaryDark: '#747474',
  white: '#FFFFFF',
  cyprus: '#0A2033',
  red: '#F10000',
};
export default colors;
