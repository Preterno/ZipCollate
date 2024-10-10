function ResultHeader(props) {
  return (
    <div className="py-2 w-96 shadow-custom-medium font-medium text-accent text-3xl bg-secondary flex items-center justify-center text-center rounded-t-xl max-sm:text-2xl max-sm:w-80">
      {props.name}
    </div>
  );
}

export default ResultHeader;
