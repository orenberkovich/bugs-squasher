interface configProps {
  speed: number;
  bugImgSize: number;
  numberOfBugs: number;
  gameTime: number;
}

export const config: configProps = {
  speed: Math.floor(Math.random() * 3) + 1, //random speed between 1 and 3
  bugImgSize: 40,
  numberOfBugs: 10,
  gameTime: 1, //in minutes
};
