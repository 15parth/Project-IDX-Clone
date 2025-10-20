import React from 'react'
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'
import {Button,Layout} from 'antd'


const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
    width: 'calc(100%)',
    height:'60%'
};

const layoutStyle = {
    borderRadius: 8,
    border:'2px solid black',
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100% )',
    height:'50vh'
};

const contentStyle = {
    display:'flex',
    margin:'20px',
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100% - 8px)',
    maxWidth: 'calc(100% - 8px)',
    height:'50vh'
};

const CreateProject = () => {

    const { Header, Footer , Sider, Content} = Layout;
    const {createProjectMutation,isPending}= useCreateProject();

    async function handleCreateProject() {
        console.log('going to trigger the api')
        try {
            await createProjectMutation();
            console.log('Now we should redirect to the editor');
        } catch (error) {
            console.log('error while creating project',error);
        }
    }


  return (
    <Layout style={layoutStyle}>
        <Header style={headerStyle}><h1>Create project</h1></Header>
        <Content style={contentStyle}>
            <Button
            type='primary'
            onClick={handleCreateProject}
            >
              Create playground
            </Button>
        </Content>
        <Footer>Footer</Footer>
    </Layout>
  )
}

export default CreateProject
