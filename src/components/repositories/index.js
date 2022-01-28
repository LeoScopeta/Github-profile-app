import React, { useEffect, useState } from "react";
import useGithub from "../../hooks/github-hooks";
import RepoItem from "../repository-item";
import * as Styled from "./styled";

const Repositories = () => {
    const { githubState, getUserRepos, getUserStarred } = useGithub();
    const [hasUserForSearchrepos, setHasUserForSearchrepos] = useState(false);

    useEffect(() => {
        if (githubState.user.login) {
            getUserRepos(githubState.user.login);
            getUserStarred(githubState.user.login);
        }
        setHasUserForSearchrepos(githubState.repositories);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [githubState.user.login]);

    return (
        <>
            {hasUserForSearchrepos ? (
                <Styled.WrapperTabs
                    selectedTabClassName="is-selected"
                    selectedTabPanelClassName="is-selected"
                >
                    <Styled.WrapperTabList>
                        <Styled.WrapperTab>Repositories</Styled.WrapperTab>
                        <Styled.WrapperTab>Starred</Styled.WrapperTab>
                    </Styled.WrapperTabList>
                    <Styled.WrapperTabPanel>
                        <Styled.WrapperList>
                            {githubState.repositories.map((item) => (
                                <RepoItem
                                    key={item.id}
                                    name={item.name}
                                    linkToRepo={item.full_name}
                                    fullName={item.full_name}
                                />
                            ))}
                        </Styled.WrapperList>
                    </Styled.WrapperTabPanel>
                    <Styled.WrapperTabPanel>
                        <Styled.WrapperList>
                            {githubState.starred.map((item) => (
                                <RepoItem
                                    key={item.id}
                                    name={item.name}
                                    linkToRepo={item.html_url}
                                    fullName={item.full_name}
                                />
                            ))}
                        </Styled.WrapperList>
                    </Styled.WrapperTabPanel>
                </Styled.WrapperTabs>
            ) : (
                <></>
            )}
        </>
    );
};

export default Repositories;