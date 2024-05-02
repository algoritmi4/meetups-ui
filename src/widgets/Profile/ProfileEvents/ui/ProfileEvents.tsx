import { ReactElement } from "react";

interface IProfileEvents {
  onEditProfile?: () => void;
  image?: string;
  name?: string;
}

export function ProfileEvents({
  onEditProfile,
  image,
  name,
}: IProfileEvents): ReactElement {
  return (
    <>
      <div> {/* созданные */}
      
      
      </div>

      <div> {/* планирую посетить */}
      
      
      </div>

      <div> {/* посещенные */}
      
      
      </div>
    </>
  );
}
