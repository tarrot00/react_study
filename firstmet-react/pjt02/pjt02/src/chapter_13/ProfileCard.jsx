import Card from "./Card";

function ProfileCard(props) {
  return (
    <Card title="김수환" backgroundColor="green">
      <p>안녕하세요 수환입니다.</p>
      <p>저는 리액트를 사용해서 개발하고 있습니다.</p>
    </Card>
  );
}

export default ProfileCard;