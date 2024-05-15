import SearchForm  from '../../Components/SearchForm'; 
import CompanyList from '../../Components/CompanyList';
import SkillList from '../../Components/SkillList';
function Home() {
    return (
        <>
            <SearchForm />
            <SkillList />
            <CompanyList /> 
        </>
    )
}
export default Home;