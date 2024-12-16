import { getFullNameFromId, doesRecordExistFromId, getUserId } from "@/app/lib/utils.js";


export default async function Page(props)
{
    const id = (await props.params).id;

    if (await doesRecordExistFromId(id) === false)
    {
	return (
		<h1 className="page-header">User {id} not found.</h1>
	);
    }

    const fullName = await getFullNameFromId(id);
    const userId = await getUserId();

    return (
	<>
	    <h1 className="page-header">{fullName}</h1>
	</>
    );

}
