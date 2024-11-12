const AllDeliveryMenTable = ({ deliveryMan, ReviewAverage }) => {
  const { name, phone, TotalDelivery, AverageReview, _id } = deliveryMan || {};
  return (
    <>
      <tr>
        <td className="font-medium text-[14px]">{name}</td>
        <td className="font-medium text-[14px]">{phone}</td>
        <td className="font-medium text-[14px]">{TotalDelivery}</td>
        <td className="font-medium text-[14px]">
          {ReviewAverage.map(
            (average) => average._id === _id && average.averageReview.toFixed(1)
          )}
        </td>
      </tr>
    </>
  );
};

export default AllDeliveryMenTable;
