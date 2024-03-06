import "./AdminNinja.css";

interface props {
  users: any;
  getNinja: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}

function AdminNinja(props: props) {
  return (
    <>
      <div className="Ninja-Container">
        {props.users.map((user: any) => {
          if (user.name.toLowerCase().includes(props.search.toLowerCase())) {
            return (
              <div className="Ninja-Item">
                <h1 className="Ninja-Item-Title">{user.name}</h1>
                <div className="Ninja-Item-Image" />
                <div className="Ninja-Item-Data">
                  <h1></h1>
                </div>
                <button
                  className="Ninja-Item-Button"
                  onClick={() => {
                    console.log(user);
                    props.getNinja(user.username);
                  }}
                >
                  View Ninja
                </button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default AdminNinja;
