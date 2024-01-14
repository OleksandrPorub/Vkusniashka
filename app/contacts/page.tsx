import { NextPage } from "next"
import TheContactsCard from "../components/contactsCard/TheContactsCard"


const page:NextPage = () => {
  return (
    <div className="page">
      <TheContactsCard></TheContactsCard>
    </div>
  )
}

export default page
