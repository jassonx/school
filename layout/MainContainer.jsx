const MainContainer = ({ ...props }) => {
  return (
    <div className="mainContainer">
      <div className="child">{props.children}</div>
    </div>
  );
};
export default MainContainer;
