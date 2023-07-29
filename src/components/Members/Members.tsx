import { ChangeEvent, FormEvent, useState } from 'react';
import * as S from './Members.style';
import IconRemove from '@assets/image/ico_remove.png';

interface IProps {
  members: string[];
  setMembers: (members: string[]) => void;
}

const Members = ({ members, setMembers }: IProps) => {
  const [member, setMember] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMembers([...members, member]);
    setMember('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newMember } = event.target;
    setMember(newMember);
  };

  const handleClickDeleteMember = (target: string) => {
    return () => {
      const newMembers = members.filter((item) => item !== target);
      setMembers(newMembers);
    };
  };

  return (
    <S.MembersWrapper>
      {members.length > 0 ? (
        <S.Members>
          {members.map((member, index) => (
            <S.MemberWrapper key={index} data-member={member}>
              <S.Member>{member}</S.Member>
              <S.RemouveButton src={IconRemove} onClick={handleClickDeleteMember(member)}></S.RemouveButton>
            </S.MemberWrapper>
          ))}
        </S.Members>
      ) : (
        <S.EmptyMembers>멤버를 추가해주세요.</S.EmptyMembers>
      )}
      <S.Form onSubmit={handleSubmit}>
        <input type="text" value={member} onChange={handleChange} />
        <button type="submit">추가</button>
      </S.Form>
    </S.MembersWrapper>
  );
};

export default Members;
