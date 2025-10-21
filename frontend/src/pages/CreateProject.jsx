import { useNavigate } from 'react-router-dom';
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'
import {Button,Col,Flex, Row} from 'antd'



const CreateProject = () => {

    const navigate= useNavigate()
    const {createProjectMutation,isPending}= useCreateProject();

    async function handleCreateProject() {
        console.log('going to trigger the api')
        try {
           const response= await createProjectMutation();

            console.log('Now we should redirect to the editor');
            navigate(`/project/${response?.data}`)
        } catch (error) {
            console.log('error while creating project',error);
        }
    }


  return (
          <Row>
         
            <Col span={24} >
                <Flex justify="center" align="center">
                    <Button
                            type="primary"
                            onClick={handleCreateProject}
                    >
                        Create Playground
                    </Button>
                </Flex>
            </Col>
            
        </Row>
  )
}

export default CreateProject
