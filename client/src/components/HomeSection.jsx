const HomeSection = ({ children, title }) => {
  return (
    <div className="mt-5">
      <h3 className="text-[28px] font-bold text-center mb-6">{title}</h3>
      {children}
    </div>
  );
};

export default HomeSection;
